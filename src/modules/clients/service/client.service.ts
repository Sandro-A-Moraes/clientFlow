import { ClientRepository } from "../repository/client.repository";

export class ClientService {
  private clientRepository: ClientRepository;

    constructor() {
        this.clientRepository = new ClientRepository();
    }

  async create(data: {
    userId: string;
    name: string;
    email: string;
    phone: string;
    observations?: string;
  }) {
    return await this.clientRepository.create(data);
  }

  async list(userId: string) {
    return await this.clientRepository.findManyByUserId(userId);
  }
}