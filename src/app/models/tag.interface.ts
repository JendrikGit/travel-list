import { IItemBase } from "./item-base.interface";

/**
 * Represents tag.
 */
export interface ITag extends IItemBase {
    /**
     * Gets or sets name of the tag.
     */
    name: string;

    /**
     * Gets or sets color of the tag.
     */
    color: string;
}