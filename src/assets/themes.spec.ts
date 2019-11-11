import { themes, images } from './themes';

describe('Theme Assets', () => {

    it('should provide 6 themes', () => {
        expect(themes.length).toBe(6);
    });

    it('should provide at least 2 * 3 = 6 images for each theme', () => {
        for (const theme of themes) {
            expect(images[theme.name].length).toBeGreaterThanOrEqual(6);
        }
    });

    it('should provide different images for different themes', () => {
        let _images: string[] = new Array();
        for (const theme of themes) {
            _images = _images.concat(images[theme.name])
        }
        _images = _images.sort();
        let duplicates: string[] = [];
        for (let i = 0; i < _images.length - 1; i++) {
            if (_images[i + 1] == _images[i]) {
                duplicates.push(_images[i]);
            }
        }
        expect(duplicates.length).toBe(0);
    });

    it('should provide existing svg images', () => {
        for (const theme of themes) {
            for (const image of images[theme.name]) {
                expect(image.substr(image.length - 4)).toBe(".svg")
            }
        }
    });
});