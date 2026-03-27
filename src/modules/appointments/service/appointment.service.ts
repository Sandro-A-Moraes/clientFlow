import { AppointmentRepository } from "../repository/appointment.repository";
import { ClientRepository } from "../../clients/repository/client.repository";

export class AppointmentService {
    private appointmentRepository: AppointmentRepository;
    private clientRepository: ClientRepository;

    constructor(appointmentRepository: AppointmentRepository, clientRepository: ClientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.clientRepository = clientRepository;
    }

    async create(data: {
        userId: string;
        clientId: string;
        description: string;
        scheduledAt: Date;
        status: string;
        notes?: string;
    }) {
        const client = await this.clientRepository.findByIdAndUserId(data.clientId, data.userId);

        if(!client) {
            throw new Error("Client not found");
        }

        return this.appointmentRepository.create(data);
    }

    async listByClientId(clientId: string) {
        return this.appointmentRepository.findManyByClientId(clientId);
    }
}