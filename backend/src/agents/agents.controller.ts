import { Controller, Post, Body } from '@nestjs/common';
import { AgentsService } from './agents.service';

export class ChatMessageDto {
  message: string;
}

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post('chat')
  async chat(@Body() chatDto: ChatMessageDto) {
    const response = await this.agentsService.processMessage(chatDto.message);

    return {
      success: true,
      response,
      timestamp: new Date().toISOString(),
    };
  }
}
