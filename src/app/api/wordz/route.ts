import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export type WordzTrack = {
    title: string;
    audioUrl: string;
    duration?: number;
    speakers?: number;
    chapters?: Array<{
        title: string;
        start: number;
        end: number;
    }>;
    transcriptId?: string;
    processing?: boolean;
};

export async function GET() {
    try {
        const wordzDir = path.join(process.cwd(), 'public/audio/WORDz');
        const jsonDir = path.join(wordzDir, 'WORDz_JSON');

        // Get all MP3 files
        const files = await fs.readdir(wordzDir);
        const mp3Files = files.filter(f => f.endsWith('.mp3'));

        // Load metadata for each MP3
        const tracks = await Promise.all(
            mp3Files.map(async (mp3): Promise<WordzTrack> => {
                const basename = mp3.replace('.mp3', '');
                const jsonPath = path.join(jsonDir, `${basename}.json`);
                const chaptersPath = path.join(jsonDir, `${basename}_chapters.json`);

                try {
                    // Try to load both JSON files
                    const [fullDataRaw, chaptersRaw] = await Promise.all([
                        fs.readFile(jsonPath, 'utf-8'),
                        fs.readFile(chaptersPath, 'utf-8')
                    ]);

                    const fullData = JSON.parse(fullDataRaw);
                    const chapters = JSON.parse(chaptersRaw);

                    // Count unique speakers from utterances
                    const speakers = fullData.utterances
                        ? new Set(fullData.utterances.map((u: any) => u.speaker)).size
                        : 0;

                    return {
                        title: basename,
                        audioUrl: `/audio/WORDz/${mp3}`,
                        speakers,
                        chapters
                    };
                } catch (err) {
                    // MP3 exists but transcription not ready yet
                    return {
                        title: basename,
                        audioUrl: `/audio/WORDz/${mp3}`,
                        processing: true
                    };
                }
            })
        );

        // Sort by title
        tracks.sort((a, b) => a.title.localeCompare(b.title));

        return NextResponse.json({ tracks });
    } catch (error) {
        console.error('Error scanning WORDz directory:', error);
        return NextResponse.json(
            { error: 'Failed to scan WORDz directory' },
            { status: 500 }
        );
    }
}
