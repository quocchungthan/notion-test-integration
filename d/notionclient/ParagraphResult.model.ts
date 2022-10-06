import { BlockObjectResponse, PartialBlockObjectResponse, TextRichTextItemResponse  } from '@notionhq/client/build/src/api-endpoints'


export class ParticalParagraphContent {
    id: string = '';
    object: string = '';
    last_edited_time: string = '';
    paragraph?: { rich_text: TextRichTextItemResponse[] };
}

export type ParagraphResult = BlockObjectResponse | ParticalParagraphContent | PartialBlockObjectResponse;