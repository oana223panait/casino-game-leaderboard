import React, { Suspense } from 'react';
import Loading from './loading';

interface PhotoProps {
    title: string;
    url: string;
    thumbnailUrl: string;
}

const Photo: React.FC<PhotoProps> = ({ title, url, thumbnailUrl }) => (
    <div>
        <Suspense fallback={<Loading />}>
            <img width={10} height={10} alt={title} src={thumbnailUrl} loading="lazy" />
            <h1>{title}</h1>
        </Suspense>
        <a href={url} target="_blank" rel="noopener noreferrer">View Full Image</a>
    </div>
);

export default Photo;
