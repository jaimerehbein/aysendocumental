
interface VideoPlayerProps {
    url: string;
    title: string;
}

export function VideoPlayer({ url, title }: VideoPlayerProps) {
    let embedUrl = '';
    let isNative = false;

    // Detectar YouTube (varios formatos)
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
        embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    }
    // Detectar Vimeo
    else if (url.includes('vimeo.com')) {
        const videoId = url.split('/').pop();
        // Parametros para limpiar la interfaz de Vimeo
        embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
    }
    // Detectar OndaMedia (generalmente usan iframes o mp4 directos, aquí asumimos un iframe genérico o fallback)
    else if (url.includes('ondamedia.cl')) {
        // OndaMedia es complejo de embeber directamente sin API, a veces funciona como link externo
        // Por ahora, mostraremos un mensaje elegante o intentaremos un iframe directo si la URL lo permite
        isNative = true; // Trataremos de mostrarlo o dar un link
    }
    // Fallback para MP4 directo u otros
    else if (url.endsWith('.mp4') || url.endsWith('.webm')) {
        isNative = true;
    }

    if (!embedUrl && !isNative) {
        return (
            <div className="w-full aspect-video bg-netflix-dark flex flex-col items-center justify-center text-gray-500 gap-4 p-8 text-center">
                <p className="text-xl">Este video está alojado en una plataforma externa.</p>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-netflix-red text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition"
                >
                    Ver en {new URL(url).hostname}
                </a>
            </div>
        );
    }

    if (isNative && url.includes('ondamedia')) {
        return (
            <div className="w-full aspect-video bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center text-white gap-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(https://ondamedia.cl/images/default_share.jpg)' }}></div>
                <div className="relative z-10 flex flex-col items-center">
                    <p className="text-2xl font-bold mb-2">Disponible en OndaMedia</p>
                    <p className="text-gray-300 mb-6 max-w-md text-center">Para ver "{title}", necesitas acceder a la plataforma de cine chileno.</p>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-500 transition shadow-lg flex items-center gap-2"
                    >
                        <span>▶ Reproducir en OndaMedia</span>
                    </a>
                </div>
            </div>
        )
    }

    if (isNative) {
        return (
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                <video
                    src={url}
                    controls
                    autoPlay
                    className="w-full h-full"
                >
                    Tu navegador no soporta el elemento video.
                </video>
            </div>
        )
    }

    return (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <iframe
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
            />
        </div>
    );
}
