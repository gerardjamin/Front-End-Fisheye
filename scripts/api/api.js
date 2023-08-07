/* eslint-disable no-unused-vars */
export async function getPhotographers() {
    return await fetch('./data/photographers.json')
        .then(res => res.json())
        .catch(err => console.log('an error occurs', err))
}