/**
 * Entidad principal que representa a un Usuario en la lógica de negocio (Dominio).
 * Esta clase es independiente del framework, base de datos o librerías externas.
 */
export class UserEntity {

    /**
     * Constructor de la entidad UserEntity.
     * @param id - Identificador único del usuario (por ejemplo, UUID).
     * @param name - Nombre completo del usuario.
     * @param email - Correo electrónico, usado habitualmente para autenticación.
     * @param password - Contraseña cifrada del usuario.
     */
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string
    ) {}

}