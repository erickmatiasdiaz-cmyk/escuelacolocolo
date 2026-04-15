import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function seedAdmin() {
  const existingAdmin = await prisma.admin.findFirst();
  if (existingAdmin) {
    console.log('El administrador ya existe');
    return;
  }

  const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
  await prisma.admin.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      nombre: 'Administrador Principal',
      email: 'admin@escuelafutbol.com',
      rol: 'admin',
    },
  });

  console.log('Administrador creado: admin / [usa ADMIN_PASSWORD o cambia la contraseña después del seed]');
}

async function seedConfiguracion() {
  const configs = [
    { clave: 'nombre_escuela', valor: 'Escuela de Fútbol Elite', descripcion: 'Nombre de la escuela' },
    { clave: 'telefono', valor: '+56 9 1234 5678', descripcion: 'Teléfono de contacto' },
    { clave: 'email', valor: 'contacto@escuelafutbol.com', descripcion: 'Email de contacto' },
    { clave: 'direccion', valor: 'Av. Deportes 1234, Santiago', descripcion: 'Dirección' },
    { clave: 'facebook', valor: 'https://facebook.com/escuelafutbol', descripcion: 'Facebook URL' },
    { clave: 'instagram', valor: 'https://instagram.com/escuelafutbol', descripcion: 'Instagram URL' },
    { clave: 'whatsapp', valor: '+56912345678', descripcion: 'WhatsApp' },
    { clave: 'hero_titulo', valor: 'Formando Campeones del Futuro', descripcion: 'Título del Hero' },
    {
      clave: 'hero_subtitulo',
      valor: 'Únete a la mejor escuela de fútbol. Entrenamiento profesional para niños y jóvenes de 4 a 17 años.',
      descripcion: 'Subtítulo del Hero',
    },
    { clave: 'nosotros_titulo', valor: 'Nuestra Historia', descripcion: 'Título sección Nosotros' },
    {
      clave: 'nosotros_contenido',
      valor:
        'Somos una escuela de fútbol con más de 10 años de experiencia formando jugadores. Nuestro enfoque va más allá del deporte: buscamos desarrollar habilidades sociales, trabajo en equipo y valores como la disciplina y el respeto.',
      descripcion: 'Contenido sección Nosotros',
    },
    {
      clave: 'nosotros_mision',
      valor:
        'Formar jugadores integrales con valores deportivos y humanos, promoviendo el desarrollo físico y emocional de nuestros estudiantes.',
      descripcion: 'Misión',
    },
    {
      clave: 'nosotros_vision',
      valor:
        'Ser la escuela de fútbol líder de la región, reconocida por la calidad de formación deportiva y humana.',
      descripcion: 'Visión',
    },
  ];

  for (const config of configs) {
    await prisma.configuracion.upsert({
      where: { clave: config.clave },
      update: {},
      create: config,
    });
  }

  console.log('Configuración base creada');
}

async function seedCategorias() {
  const categorias = [
    {
      nombre: 'Pre-Infantil',
      descripcion: 'Para los más pequeños que comienzan en el fútbol',
      edadMinima: 4,
      edadMaxima: 6,
      orden: 1,
    },
    { nombre: 'Infantil', descripcion: 'Desarrollo de habilidades básicas', edadMinima: 7, edadMaxima: 10, orden: 2 },
    {
      nombre: 'Juvenil A',
      descripcion: 'Perfeccionamiento técnico y táctico',
      edadMinima: 11,
      edadMaxima: 14,
      orden: 3,
    },
    {
      nombre: 'Juvenil B',
      descripcion: 'Preparación para competencia',
      edadMinima: 15,
      edadMaxima: 17,
      orden: 4,
    },
  ];

  for (const categoria of categorias) {
    await prisma.categoria.upsert({
      where: { nombre: categoria.nombre },
      update: {},
      create: categoria,
    });
  }

  console.log('Categorías creadas');
}

async function seedHorarios() {
  const categorias = await prisma.categoria.findMany();

  const horarios = [
    { dia: 'Lunes', horaInicio: '10:00', horaFin: '11:30', sede: 'Cancha Principal' },
    { dia: 'Miércoles', horaInicio: '10:00', horaFin: '11:30', sede: 'Cancha Principal' },
    { dia: 'Viernes', horaInicio: '10:00', horaFin: '11:30', sede: 'Cancha Principal' },
  ];

  for (const categoria of categorias) {
    for (const horario of horarios) {
      await prisma.horario.create({
        data: {
          ...horario,
          categoriaId: categoria.id,
        },
      });
    }
  }

  console.log('Horarios creados');
}

async function main() {
  console.log('Iniciando seed...');
  await seedAdmin();
  await seedConfiguracion();
  await seedCategorias();
  await seedHorarios();
  console.log('Seed completado');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
