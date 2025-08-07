import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { CreateMessageDto } from '../dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get('conversation/:conversationId')
  findByConversation(@Param('conversationId') conversationId: string) {
    return this.messageService.findByConversation(conversationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
