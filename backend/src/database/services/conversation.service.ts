import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../entities/conversation.entity';
import { CreateConversationDto } from '../dto/create-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async create(
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    const conversation = this.conversationRepository.create(
      createConversationDto,
    );
    return this.conversationRepository.save(conversation);
  }

  async findAll(): Promise<Conversation[]> {
    return this.conversationRepository.find({
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }

    return conversation;
  }

  async findOneWithMessages(id: string): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
      relations: ['messages'],
      order: {
        messages: { createdAt: 'ASC' },
      },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }

    return conversation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.conversationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }
  }
}
