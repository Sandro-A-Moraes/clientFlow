import { generateAccessToken } from "../../../shared/utils/generateToken.js";
import { UserRepository } from "../../user/repository/user.repository.js";
import bcrypt from "bcrypt";

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  public async login(data: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateAccessToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });
    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }

  public async me(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return { user: { id: user.id, name: user.name, email: user.email } };
  }
}
