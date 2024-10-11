import { connectToDB } from "@utils/database";
import Prompt from "@models/prompts";

export const POST = async (req) => {
    const { userID, prompt, tag} = await req.json();

    try {
        await connectToDB()
        const newPrompt = new Prompt({
            creator: userID,
            prompt,
            tag
        })
        
        await newPrompt.save() // save it to DB
        
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    
    } catch (error) {
        // console.log(error)
        return new Response("Failed to create a new Prompt", { status: 500 })
        // server error
    }
}