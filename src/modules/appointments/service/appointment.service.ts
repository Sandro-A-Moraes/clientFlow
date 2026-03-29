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
        
        
        if ( !data.clientId || !data.description || !data.scheduledAt || !data.status) {
            throw new Error("Missing required fields");
        }

        if (isNaN(data.scheduledAt.getTime())) {
            throw new Error("Invalid scheduledAt date");
        }
        
        const client = await this.clientRepository.findByIdAndUserId(data.clientId, data.userId);
        
        if(!client) {
            throw new Error("Client not found");
        }

        return this.appointmentRepository.create({
            clientId: data.clientId,
            description: data.description,
            scheduledAt: data.scheduledAt,
            status: data.status,
            ...(data.notes !== undefined && { notes: data.notes }),
        });
    }

    async listByClientId(clientId: string, userId: string) {
        const client = await this.clientRepository.findByIdAndUserId(clientId, userId);

        if(!client) {
            throw new Error("Client not found");
        }

        return this.appointmentRepository.findManyByClientId(clientId);
    }
}