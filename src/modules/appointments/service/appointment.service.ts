import { AppointmentRepository } from "../repository/appointment.repository";

export class AppointmentService {
    private appointmentRepository: AppointmentRepository;

    constructor(appointmentRepository: AppointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    async create(data: {
        clientId: string;
        description: string;
        scheduledAt: Date;
        status: string;
        notes?: string;
    }) {
        return this.appointmentRepository.create(data);
    }

    async listByClientId(clientId: string) {
        return this.appointmentRepository.findManyByClientId(clientId);
    }
}