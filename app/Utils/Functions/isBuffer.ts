/* eslint-disable prettier/prettier */
import type { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";

export default function isBuffer(file: MultipartFileContract | Buffer): file is Buffer {
    return (file as Buffer).length !== undefined
}