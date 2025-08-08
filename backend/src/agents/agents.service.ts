import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Agent, run, setDefaultOpenAIKey } from '@openai/agents';

@Injectable()
export class AgentsService {
  private scriptAgent: Agent;

  constructor(private configService: ConfigService) {
    const openaiApiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY is required');
    }
    setDefaultOpenAIKey(openaiApiKey);

    this.initializeAgents();
  }

  private initializeAgents() {
    this.scriptAgent = new Agent({
      name: 'VideoScriptAgent',
      instructions: `You are a professional video script writer. 
        Generate engaging video scripts with clear scene descriptions, 
        dialogue, and visual cues. Format the output as JSON with 
        scenes, descriptions, and timing.`,
      model: 'gpt-4',
    });
  }

  async processMessage(message: string): Promise<string> {
    try {
      const result = await run(this.scriptAgent, message);

      return result.finalOutput;
    } catch (error) {
      console.error('Agent processing error:', error);
      throw new Error('Failed to process message with agent');
    }
  }
}
