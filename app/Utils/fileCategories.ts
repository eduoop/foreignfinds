/* eslint-disable prettier/prettier */
const fileCategories = ['avatar', 'product_image'] as const

type FileCategory = typeof fileCategories[number]

export { fileCategories, FileCategory }
