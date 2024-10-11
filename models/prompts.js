import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: { // creator of a specific prompt
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required'],
    },
    tag: { // tag for a specific prompt
        type: String,
        required: [true, 'Tag is required'],
    }
})

// one user can create many prompts 1:m

const Prompt = models.Prompt || model('Prompt', PromptSchema);
// either get the prompt that already exists else create a new model based on the promptschema

export default Prompt;