// controllers/invitation.controller.js
import Invitation from '../models/Invitation';
import User from '../models/User';

/**
 * Crea y envía una nueva invitación.
 * El ID de esta invitación será el contenido del código QR.
 */
export const createInvitation = async (req, res) => {
  try {
    const { guestEmail, eventName, eventDate } = req.body;
    const hostId = req.userId; // Obtenido del token JWT

    // Validar que el invitado exista en el sistema
    const guest = await User.findOne({ email: guestEmail });
    if (!guest) {
      return res.status(404).json({ message: 'El email del invitado no está registrado.' });
    }

    const newInvitation = new Invitation({
      host: hostId,
      guestEmail,
      eventName,
      eventDate
    });

    const savedInvitation = await newInvitation.save();

    // El contenido del QR será el _id de la invitación
    res.status(201).json({
      message: 'Invitación creada exitosamente.',
      invitationId: savedInvitation._id, // Este ID se usará para generar el QR en el cliente
      invitation: savedInvitation
    });

  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
};

/**
 * Obtiene las invitaciones enviadas por el usuario actual (anfitrión).
 */
export const getSentInvitations = async (req, res) => {
  try {
    const sentInvitations = await Invitation.find({ host: req.userId }).populate('host', 'username email');
    res.status(200).json(sentInvitations);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
};

/**
 * Obtiene las invitaciones recibidas por el usuario actual (invitado).
 */
export const getReceivedInvitations = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const receivedInvitations = await Invitation.find({ guestEmail: user.email }).populate('host', 'username email');
    res.status(200).json(receivedInvitations);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
};

/**
 * Valida una invitación (simulando el escaneo de un QR).
 */
export const validateInvitation = async (req, res) => {
  // En un caso real, aquí se podría cambiar el estado a 'used'
  const invitation = await Invitation.findById(req.params.invitationId).populate('host', 'username email');
  if (!invitation) return res.status(404).json({ message: 'Invitación no válida o no encontrada.' });

  res.status(200).json({ message: 'Invitación válida.', invitation });
};