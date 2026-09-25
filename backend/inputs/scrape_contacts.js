/**
 * @typedef {import('../../frontend/node_modules/botasaurus-controls/dist/index').Controls} Controls
 */

/**
 * @param {Controls} controls
 */
function getInput(controls) {
    controls
        .listOfTexts('websites', {
            isRequired: true,
            label: 'Adresy stron',
            placeholder: 'example.pl',
            defaultValue: [],
            helpText: 'Podaj domeny lub pełne adresy URL stron, z których chcesz wyszukać dane kontaktowe.',
        })
        .select('mode', {
            label: 'Zakres skanowania',
            defaultValue: 'key_pages',
            options: [
                { value: 'homepage', label: 'Tylko strona główna' },
                { value: 'key_pages', label: 'Najważniejsze podstrony' },
                { value: 'deep', label: 'Pełne skanowanie' },
            ],
            helpText: 'Pełne skanowanie sprawdza do 20 podstron i zwykle znajduje najwięcej danych. Najważniejsze podstrony działają szybciej.',
        })
}
