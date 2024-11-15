import { Expose } from 'class-transformer';

export class UserResDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  fullProfileImage: string;

  @Expose()
  email: string;
}
