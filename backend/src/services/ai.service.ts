import { Service } from "typedi";
import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";


// updated
@Service()
export class AIService {
  private model: ChatGroq;

  constructor() {
    this.model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY as string,
      model: "llama-3.3-70b-versatile", // Super fast and smart
      temperature: 0.7,
    });
  }

    async generateRoadmap(skill: string) {
    const response = await this.model.invoke([
      new SystemMessage(
        "You are a Senior Career Coach. You must respond ONLY with a JSON object. " +
        "Do not include any conversational text before or after the JSON. " +
        "The JSON must have this structure: " +
        "{ \"title\": string, \"description\": string, \"steps\": string[] }"
      ),
      new HumanMessage(`Create a 5-step roadmap for: ${skill}`),
    ]);

    // 🆕 Parse the string response into a real JavaScript Object
    try {
      return JSON.parse(response.content as string);
    } catch (error) {
      throw new Error("AI failed to generate a valid JSON roadmap.");
    }
  }

}
