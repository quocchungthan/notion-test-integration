import { BlockObjectResponse, PartialBlockObjectResponse, TextRichTextItemResponse  } from '@notionhq/client/build/src/api-endpoints'

export class Text { rich_text: TextRichTextItemResponse[] = [] }

export class ParticalParagraphContent {
    id: string = '';
    object: string = '';
    last_edited_time: string = '';
    paragraph?: Text;
    bulleted_list_item?: Text;
    to_do?: Text
    toggle?: Text;
    type: string = '';
    quote: Text | undefined;
    template: Text | undefined;

    getTexts() {
        return this.paragraph || this.bulleted_list_item || this.to_do || this.toggle || this.quote || this.template;
    }
}

export type ParagraphResult = BlockObjectResponse | ParticalParagraphContent | PartialBlockObjectResponse;