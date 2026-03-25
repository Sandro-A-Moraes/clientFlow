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
    observations?: string;
  }) {
    return this.clientRepository.create(data);
  }

  list(userId: string, search?: string) {
    return this.clientRepository.findMany(userId, search);
  }
}
