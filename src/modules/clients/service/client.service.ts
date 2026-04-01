import { ClientRepository } from "../repository/client.repository";

export class ClientService {
  private clientRepository: ClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async create(data: {
    userId: string;
    name: string;
    email: string;
    phone: string;
    notes?: string;
  }) {
    return this.clientRepository.create(data);
  }

  async list(userId: string, search?: string) {
    return this.clientRepository.findMany(userId, search);
  }

  async getById(clientId: string, userId: string) {
    return this.clientRepository.findByIdAndUserId(clientId, userId);
  }

}
