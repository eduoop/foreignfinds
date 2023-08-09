/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TestAwsController {
    public async get({ }: HttpContextContract) {
        const AWS = require('aws-sdk');

        AWS.config.update({
            accessKeyId: 'AKIAWPBONNOAKKDZQB2A',
            secretAccessKey: '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',
            region: 'sa-east-1'
        });

        const s3 = new AWS.S3();

        await s3.listBuckets((err, data) => {
            if (err) {
                console.error('Erro ao listar os buckets:', err);
            } else {
                console.log('Buckets disponíveis:', data.Buckets);
            }
        });

        return "see the console"
    }
}