import { IsString, IsUUID, IsOptional, IsIn } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsIn(['user', 'assistant', 'tool'])
  role: string;

  @IsString()
  content: string;

  @IsUUID()
  conversationId: string;

  @IsOptional()
  toolCalls?: any[];

  @IsOptional()
  metadata?: any;
}
