import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Monitoring Pre-Venda')
  .setDescription('Api de monitoramento e gerenciamento para o pré-venda')
  .setVersion('0.0.1')
  .addTag('vendedores')
  .addBearerAuth(
    {
      in: 'header',
      type: 'http',
      bearerFormat: 'Bearer {token}',
      description: 'Admin token'
    },
    'admin'
  )
  .build();
