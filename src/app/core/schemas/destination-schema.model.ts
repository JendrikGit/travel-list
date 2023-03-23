import { RxJsonSchema } from "rxdb";
import { IDestination } from "src/app/models/destination.interface";
import { IList } from "src/app/models/list.interface";
import { ITag } from "src/app/models/tag.interface";

/**
 * Collection schema for destinations.
 */
export const destinationsSchema: RxJsonSchema<IDestination>  = {
    title: 'destinations schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        destination: {
            type: 'string',
        },
        continent: {
            type: 'string'
        },
        createdAt: {
            type: 'object'
        },
        tag: {
            type: 'object',
        },
        list: {
            type: 'object'
        },
        done: {
            type: 'boolean'
        }
    },
    required: ['id', 'destination', 'continent', 'createdAt', 'tag', 'list', 'done']
}

/**
 * Collection schema for my lists.
 */
export const listsSchema: RxJsonSchema<IList>  = {
    title: 'lists schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        name: {
            type: 'string',
        },
    },
    required: ['id', 'name']
}

/**
 * Collection schema for tags.
 */
export const tagsSchema: RxJsonSchema<ITag>  = {
    title: 'tags schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        name: {
            type: 'string',
        },
    },
    required: ['id', 'name']
}