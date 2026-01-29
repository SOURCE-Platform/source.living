const sharp = require('sharp');
const fs = require('fs');

const imagePath = '/Users/adam/.gemini/antigravity/brain/335dc5af-c828-4f9a-aa55-71e1107fc3ab/uploaded_media_1769635973268.png';

sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
        const colorCounts = {};

        for (let i = 0; i < data.length; i += info.channels) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const key = `${r},${g},${b}`;
            colorCounts[key] = (colorCounts[key] || 0) + 1;
        }

        const sortedColors = Object.entries(colorCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        console.log('Top colors (R,G,B):');
        sortedColors.forEach(([color, count]) => {
            console.log(`- rgb(${color}) : ${count} pixels`);
        });
    })
    .catch(err => {
        console.error(err);
    });
