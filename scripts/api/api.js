/* eslint-disable no-unused-vars */
/**
 * use for reccording all data about photographers
 * @returns all photographers data
 */
export async function getPhotographers() {
    return await fetch('./data/photographers.json')
        .then(res => res.json())
        .catch(err => console.log('an error occurs', err))
}