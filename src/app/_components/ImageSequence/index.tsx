'use client'

import React, { useEffect, useRef, useState } from 'react'

import classes from './index.module.scss'

export interface ImageSequenceProps {
    prefix: string
    frameCount: number
    extension?: string
    fps?: number
    className?: string
}

export const ImageSequence: React.FC<ImageSequenceProps> = ({
    prefix,
    frameCount,
    extension = 'jpg',
    fps = 24,
    className,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const frameIndexRef = useRef(0)
    const lastTimeRef = useRef(0)

    useEffect(() => {
        let loadedCount = 0
        const loadedImages: HTMLImageElement[] = []

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image()
            const frameNumber = i.toString().padStart(3, '0')
            img.src = `${prefix}${frameNumber}.${extension}`
            img.onload = () => {
                loadedCount++
                if (loadedCount === frameCount) {
                    setIsLoaded(true)
                }
            }
            loadedImages.push(img)
        }

        setImages(loadedImages)
    }, [prefix, frameCount, extension])

    useEffect(() => {
        if (!isLoaded || images.length === 0) return

        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (!canvas || !context) return

        const animate = (time: number) => {
            const deltaTime = time - lastTimeRef.current
            const interval = 1000 / fps

            if (deltaTime > interval) {
                lastTimeRef.current = time - (deltaTime % interval)

                const img = images[frameIndexRef.current]
                if (img) {
                    // Clear canvas and draw fixed size for hero background
                    context.clearRect(0, 0, canvas.width, canvas.height)

                    // Cover logic (similar to object-fit: cover)
                    const canvasAspect = canvas.width / canvas.height
                    const imgAspect = img.width / img.height

                    let drawWidth = canvas.width
                    let drawHeight = canvas.height
                    let offsetX = 0
                    let offsetY = 0

                    if (imgAspect > canvasAspect) {
                        drawWidth = canvas.height * imgAspect
                        offsetX = (canvas.width - drawWidth) / 2
                    } else {
                        drawHeight = canvas.width / imgAspect
                        offsetY = (canvas.height - drawHeight) / 2
                    }

                    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
                }

                frameIndexRef.current = (frameIndexRef.current + 1) % frameCount
            }

            requestAnimationFrame(animate)
        }

        const firstFrameRequest = requestAnimationFrame(animate)

        // Handle resize
        const handleResize = () => {
            if (canvas) {
                canvas.width = canvas.offsetWidth * window.devicePixelRatio
                canvas.height = canvas.offsetHeight * window.devicePixelRatio
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            cancelAnimationFrame(firstFrameRequest)
            window.removeEventListener('resize', handleResize)
        }
    }, [isLoaded, images, frameCount, fps])

    return (
        <div className={[classes.container, className].filter(Boolean).join(' ')}>
            <canvas ref={canvasRef} className={classes.canvas} />
            {!isLoaded && <div className={classes.loader}>Loading...</div>}
        </div>
    )
}
