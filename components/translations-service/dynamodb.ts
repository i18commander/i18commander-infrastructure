import * as aws from "@pulumi/aws";
import {config} from "../../resources";

const TABLE_NAME = 'translations' as const
const PROJECT_IDENTIFIER_HASH_KEY = 'ProjectIdentifier' as const
const KEY = 'Key' as const

const resourceName = `${TABLE_NAME}-table`

const translationsTable = new aws.dynamodb.Table(resourceName, {
    name: 'translations',
    readCapacity: 20,
    writeCapacity: 20,
    hashKey: PROJECT_IDENTIFIER_HASH_KEY,
    rangeKey: KEY,
    attributes: [
        {
            name: PROJECT_IDENTIFIER_HASH_KEY,
            type: 'S'
        },
        {
            name: KEY,
            type: 'S'
        }
    ],
    tags: {
        Name: resourceName,
        Environment: config.ENVIRONMENT
    }
})

export const dynamodbName = translationsTable.name
export const dynamodbArn = translationsTable.arn