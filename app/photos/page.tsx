'use client'
import React, { useState, useEffect, lazy } from 'react';
import { useInView } from 'react-intersection-observer';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Photo {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

const buildUrlWithParams = (baseUrl: string, params: Record<string, string | number>): string => {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
    });
    return url.toString();
};

const fetchPhotos = async (page: number) => {
    const url = buildUrlWithParams('http://localhost:4000/api/getPhotos', { _page: page, _limit: 20 });

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch photos');
    }
    return response.json();
};

const PhotoPreview = lazy(() => import('../../components/photo'));

const Photos: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState(1);
    const { ref, inView } = useInView({ threshold: 0.2 }); // threshold option is indicating percentage of visibility before triggering

    useEffect(() => {
        const loadInitialPhotos = async () => {
            try {
                const initialPhotos = await fetchPhotos(1);
                setPhotos(initialPhotos);
            } catch (error) {
                console.error('Error fetching initial photos:', error);
            }
        };

        loadInitialPhotos();
    }, []);

    useEffect(() => {
        if (inView) {
            const loadMorePhotos = async () => {
                try {
                    const newPhotos = await fetchPhotos(page + 1);
                    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
                    setPage(page + 1);
                } catch (error) {
                    console.error('Error fetching more photos:', error);
                }
            };

            loadMorePhotos();
        }
    }, [inView]);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Photo Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="photo-grid">
                        {photos.map((photo) => (
                            <PhotoPreview key={photo.id} title={photo.title} url={photo.url} thumbnailUrl={photo.thumbnailUrl} />
                        ))}
                    </div>
                    <div ref={ref} style={{ height: '1px' }}></div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Photos;