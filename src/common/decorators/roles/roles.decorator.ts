import { SetMetadata } from '@nestjs/common';
import { role } from 'src/common/guards/role';

export const Roles = (...roles: typeof role) => SetMetadata('roles', roles);