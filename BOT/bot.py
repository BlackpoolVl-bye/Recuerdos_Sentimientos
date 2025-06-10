import telebot
from config import TELEGRAM_TOKEN
from datetime import datetime
import random

OPCIONES = [
    "Cine",
    "Parque",
    "Comer",
    "Ir de compras",
    "Avila",
    "Salir a caminar",
    "Cat cafe",
    "Explorar la ciudad",
    "Playa"
]

FRASES_ROMANTICAS = [
    "Eres mi lugar favorito, no importa dónde estemos. ❤️",
    "Contigo, cualquier plan es perfecto ❤️",
    "Gracias por existir y hacerme tan feliz ❤️",
    "Eres mi sueño hecho realidad mi amor ❤️",
    "Cada día contigo es mi día favorito... Si es a tu lado siempre sera perfecto ❤️",
    "Ti amo más de lo que las palabras pueden decir amor e incluso mas de lo que pueda expresar yo ❤️",
    "Eres la razón de mi sonrisa y la dueña de mi corazón ❤️",
]

PREGUNTAS_DIVERTIDAS = [
    "¿Cuál es tu recuerdo favorito juntos?",
    "¿Qué lugar te gustaría visitar conmigo?",
    "¿Cuál es tu comida favorita para una cita o mejor dicho, que te gustaria que comieramos en nuestra proxima cita?",
    "¿Qué canción te recuerda a nosotros?",
    "¿Qué superpoder te gustaría tener para usar en una cita... ummmm yo, volar... te llevo en mis brazos a todos lados?",
    "¿Prefieres una tarde de pelis o una aventura al aire libre como por ejemplo el parque del este?"
]

FECHA_ESPECIAL = datetime(2024, 7, 23)

bot = telebot.TeleBot(TELEGRAM_TOKEN)

COMANDOS = """
<b>Comandos disponibles:</b>
/start o /help - Mostrar este mensaje de ayuda
/salir - Ver opciones para salir juntos
/frase - Recibir una frase
/diasjuntos - Ver cuántos días llemos juntos
/pregunta - Pregunta divertida shishishi
/cuentaatras - Días para el próximo aniversario
/sorpresa - Sugerencia aleatoria de plan
/extraño - Mensaje tierno cuando te extraño
"""

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.send_message(
        message.chat.id,
        f"¡Hola mi amor! ❤️\n¿Te gustaría que te ayude a elegir un plan para salir juntos o algo mas de que tenemos disponible para ti preciosa?\n\n{COMANDOS}",
        parse_mode="HTML"
    )

@bot.message_handler(commands=['extraño'])
def extrano(message):
    mensajes = [
        "No sabes la falta que me haces... cada momento sin ti... es un pedacito de mi que se extraña... Pienso en tu sonrisa... en tus ojos que me iluminan el alma... en la calidez de tus abrazos que tanto anhelo... Extraño cada pequeño detalle... cada conversación... cada risa que compartimos... Simplemente te extraño... con una intensidad que no puedo describir... No veo la hora de volver a tenerte cerca... de sentir tu presencia... Eres mi todo... mi razón para ser feliz, eres todo para mi cielo... Ti amo... con todo mi ser... y te extraño infinitamente❤️",
    ]
    bot.reply_to(message, random.choice(mensajes))

@bot.message_handler(commands=['salir'])
def opciones_salir(message):
    markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True, one_time_keyboard=False)
    for opcion in OPCIONES:
        markup.add(opcion)
    bot.send_message(
        message.chat.id,
        "¿A dónde te gustaría ir hoy? Elige una opción: (Dale a las opciones al lado de la barra de escribir mi vida ❤️)",
        reply_markup=markup
    )

@bot.message_handler(commands=['frase'])
def frase_romantica(message):
    frase = random.choice(FRASES_ROMANTICAS)
    bot.reply_to(message, frase)

@bot.message_handler(commands=['diasjuntos'])
def dias_juntos(message):
    hoy = datetime.now()
    dias = (hoy - FECHA_ESPECIAL).days
    bot.reply_to(message, f"Llevamos {dias} días juntos desde nuestra fecha especial. ¡Ti amooooooooooooooo! ❤️")

@bot.message_handler(commands=['pregunta'])
def pregunta_divertida(message):
    pregunta = random.choice(PREGUNTAS_DIVERTIDAS)
    bot.reply_to(message, pregunta)

@bot.message_handler(commands=['cuentaatras'])
def cuenta_atras(message):
    proximo_aniversario = FECHA_ESPECIAL.replace(year=datetime.now().year)
    if proximo_aniversario < datetime.now():
        proximo_aniversario = proximo_aniversario.replace(year=proximo_aniversario.year + 1)
    dias = (proximo_aniversario - datetime.now()).days
    bot.reply_to(message, f"Faltan {dias} días para nuestro próximo aniversario. ❤️")

@bot.message_handler(commands=['sorpresa'])
def sorpresa(message):
    opcion = random.choice(OPCIONES)
    bot.reply_to(message, f"¡Sorpresa! Hoy podríamos ir a: {opcion} ❤️")

@bot.message_handler(func=lambda m: m.text in OPCIONES)
def respuesta_opcion(message):
    respuestas = {
        "Cine": "Ir al cine juntos siempre es un buen plan... ¿Qué película te gustaría ver?",
        "Parque": "Un paseo por el parque suena muy romántico... Shi... Podemos llevar algo de comer y disfrutar el día.",
        "Comer": "¡Salir a comer juntos es delicioso! ¿Tienes antojo de algo especial?",
        "Ir de compras": "Vamos de compras.... Podemos buscar algo bonito para ti o simplemente pasear shishishi",
        "Playa": "Sería muyyy divertido... Solo tendríamos que coordinar todo y planificar bien el viaje a la playa",
        "Avila": "Emocionante, SIIIII.... pero tenemos que coordinar bien el viaje y creo que sería mejor hacerlo más adelante, donde nos podamos quedar en algún lugar y pasar la noche juntos",
        "Salir a caminar": "Una caminata juntos siempre es refrescante... Podemos ir a un lugar bonito y disfrutar del aire libre",
        "Cat cafe": "Un café con gatitos, ame... ¿Te gustaría ir a ver a los hermosos gatitos mi amor?",
        "Explorar la ciudad": "Explorar la ciudad juntos suena emocionante... Podemos descubrir nuevos lugares y disfrutar de la aventura... Además de tiempo juntos"
    }
    bot.reply_to(message, respuestas.get(message.text, "Esa opción también suena divertida mi amor ❤️"))

if __name__ == "__main__":
    bot.polling()