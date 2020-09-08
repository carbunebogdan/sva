import { FormErrorService } from "../form-error.service";

export class Question {
    public type;
    public answers = [];
    public hidden = false;

    constructor(questionAnswers, public title, public order, protected mandatory?: boolean) {
        this.answers = questionAnswers.map((answer) => ({
            label: answer.translations['1'].text,
            id: answer.id,
            order: answer.order,
            mandatory: answer.mandatory,
            type: answer.type?.object_name
        }))
    }

    public getData() {
        return "Not implemented yet" as any;
    };

    public getAnswer() {
        return "Not implemented yet" as any;
    };

    public getValidity() {
        return "Not implemented yet" as any;
    }
}

export class MultiselectQuestion extends Question {
    public hasFreetext = false;
    public textField = null;
    public freeTextLabel;

    constructor(questionData: any) {
        super(questionData.answers, questionData.translations['1'].text, questionData.order, questionData.mandatory);
        this.type = 'multiselect';
        this.hasFreetext = questionData.freetext;
        this.freeTextLabel = questionData.type.params['1']['free_text_label'][0]?.value;
    }

    public getValidity(): any {
        if (!this.mandatory) {
            return {
                valid: true
            };
        }

        let valid = this.answers.filter(answer => answer.toggle).length > 0;
        if (!valid) {
            return {
                error: ['mandatory', 'question']
            }
        }

        return {
            valid: true
        };
    }

    public getAnswer() {
        return this.answers.filter(answer => answer.toggle);
    };

    public getData() {
        if (this.getValidity())
            return {
                [`q${this.order}_response`]: this.answers.filter(answer => answer.toggle).map(answer => answer.label).join(', '),
                [`q${this.order}_comments`]: this.textField
            };
    }

}

export class SelectQuestion extends Question {
    public selection = null;

    constructor(questionData: any) {
        super(questionData.answers, questionData.translations['1'].text, questionData.order, questionData.mandatory);
        this.type = 'select';
    }

    public getValidity(): any {
        if (!this.mandatory) {
            return {
                valid: true,
            };
        }

        if (!this.selection) {
            return {
                error: ['mandatory', 'question']
            }
        }
        return {
            valid: true,
        }
    }

    public getAnswer() {
        return this.answers.filter(answer => answer.id == this.selection)[0];
    };


    public getData() {
        if (this.getValidity())
            return {
                [`q${this.order}_response`]: this.answers.filter((answer) => answer.id == this.selection)[0].label,
            };
    }

}

export class OpenQuestion extends Question {
    public textModel = '';
    constructor(questionData: any) {
        super(questionData.answers, questionData.translations['1'].text, questionData.order, questionData.mandatory);
        this.type = 'open';
    }

    public getValidity(): any {
        if (!this.mandatory) {
            return {
                valid: true,
            };
        }

        if (this.textModel.length == 0) {
            return {
                error: ['mandatory', 'question']
            };
        }

        return {
            valid: true,
        };
    }

    public getData() {
        if (this.getValidity())
            return {
                [`q${this.order}_response`]: this.textModel
            }
    }
}

export class FormQuestion extends Question {
    public formItems: any = [];
    constructor(questionData: any) {
        super(questionData.answers, questionData.translations['1'].text, questionData.order, questionData.mandatory);
        this.type = 'form';
        this.formItems = this.answers.map((answer) => ({
            label: answer.label,
            type: answer.type.split(' ')[1],
            model: null,
            required: answer.mandatory,
            order: answer.order
        }))
    }

    public getValidity(): any {
        if (!this.mandatory) {
            return {
                valid: true,
            };
        }

        for (let item of this.formItems) {
            if (item.required && !item.model) {
                return {
                    error: ['mandatory', 'field'],
                    data: item.label
                }
            }
        }

        return {
            valid: true,
        };;
    }

    public getAnswer() {
        return this.formItems.map((item) => ({ order: item.order, data: item.model }));
    };

    public getData() {
        if (this.getValidity()) {
            return this.formItems.reduce((obj, item) => {
                obj[`q${this.order}_field${item.order}_response`] = item.model;
                return obj;
            }, {})
        }
    }
}