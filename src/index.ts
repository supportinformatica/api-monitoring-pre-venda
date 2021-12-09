import 'dotenv/config';

import { bootstrap } from './server/config';

bootstrap().catch(err => console.error(err));
