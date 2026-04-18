# 🏗️ Guía de Contribución: Construyendo SpeakUp

Bienvenido al equipo de obra. En SpeakUp Institute, no estamos acumulando código ni contenido; estamos diseñando la infraestructura que sostiene el aprendizaje de nuestros usuarios.

Si estás aquí, es porque entiendes que **el inglés no se estudia, se construye**, y quieres ayudarnos a mejorar los planos de este sistema.

---

## 🧭 Nuestros Principios de Contribución

Antes de abrir un Pull Request, pasa tu idea por el **Filtro SpeakUp**:

1. **Lógica Estructural over Parches** — No buscamos soluciones rápidas que "parezcan" funcionar. Buscamos cambios que refuercen la base del sistema.
2. **Minimalismo Funcional** — Si puedes resolver un problema con 3 líneas de código o 2 párrafos de contenido en lugar de 10, hazlo. El ruido es el enemigo de la claridad.
3. **Honestidad Radical** — Si detectas un error en nuestra arquitectura, dínoslo directamente. En SpeakUp, un error no es un fallo, es un estado temporal y una oportunidad de optimización.
4. **Mentalidad Build in Public** — Documenta tu proceso. Nos interesa tanto el "cómo" lo resolviste como el resultado final.

---

## 🛠️ Cómo Puedes Colaborar

### 1. Reporte de "Fallas en la Estructura" (Bugs)

Si encuentras algo que no encaja o que rompe la experiencia del usuario:

- Revisa si ya existe un issue abierto sobre el tema.
- Si no, abre uno nuevo usando este lenguaje técnico:
  - **Diagnóstico del Terreno** — ¿Qué está fallando y dónde?
  - **Punto de Tensión** — ¿Qué comportamiento esperabas?
  - **Propuesta de Ajuste** — ¿Cómo lo resolverías?

### 2. Mejora de Contenido Pedagógico

Estamos construyendo el **Roadmap A1: Fundamentos de la Construcción**. Si propones cambios en las lecciones, asegúrate de que sigan nuestra **Sintaxis de Lección**:

1. **El Problema** — Frustración real.
2. **La Lógica** — Por qué sucede.
3. **La Construcción** — Ejecución inmediata.
4. **Validación** — Práctica en el Skill Lab.

### 3. Desarrollo Técnico

Trabajamos con **Next.js**, **TypeScript** y **TailwindCSS**.

- Mantén el código limpio y tipado.
- Si una función no aporta valor a la infraestructura del mensaje, se elimina.

---

## 🛠️ Flujo de Trabajo con Git

> ¿Eres nuevo en Git? Esta sección está escrita especialmente para ti. Lee los conceptos clave antes de ejecutar cualquier comando.

### 🔑 Conceptos Clave (Léelos Antes de Empezar)

| Término | ¿Qué hace? | Analogía |
| :--- | :--- | :--- |
| `fetch` | Descarga información del servidor **sin tocar tu copia local**. | Mirar el tablón de anuncios sin llevarte nada. |
| `pull` | Descarga cambios **y los integra** en tu copia local. | Traer las novedades del tablón y pegarlas en tu cuaderno. |
| `rebase` | Reorganiza tus commits para que aparezcan **después** de los cambios más recientes del equipo. Mantiene el historial limpio y lineal. | Reescribir tu borrador como si hubieras empezado a trabajar después de que llegara el último informe. |
| `stash` | Guarda temporalmente tu trabajo sin hacer un commit. | Meter tu borrador en un cajón para tener las manos libres. |
| `branch` | Una copia aislada del proyecto donde puedes trabajar sin afectar a los demás. | Una hoja de trabajo independiente antes de editar el documento oficial. |

---

### 🟢 Fase 1 — Inicio de Jornada

**Objetivo:** Sincronizar tu copia local con el estado exacto de `main` en la nube y limpiar ramas obsoletas.

> ⚠️ **Advertencia:** Estos comandos son destructivos. Asegúrate de no tener trabajo local sin subir en `main`.

```bash
# 1. Ir a 'main' y forzar sincronización con la nube
git checkout main && git fetch origin && git reset --hard origin/main

# 2. Eliminar ramas locales que ya no existen en el servidor
git fetch -p && git branch | grep -v "main" | xargs git branch -D

# 3. Crear tu nueva rama de tarea
# Convención: feature/descripcion-concisa
git checkout -b feature/nombre-de-la-tarea
```

---

### 🟡 Fase 2 — Desarrollo del Día a Día

**Objetivo:** Registrar avances de forma atómica y subir el trabajo de manera segura.

```bash
# Ver qué archivos cambiaste
git status

# Preparar todos los cambios para el commit
git add .

# Registrar el commit con un mensaje descriptivo (ver convención más abajo)
git commit -m "feat: descripción clara y concisa del cambio"

# Subir la rama por primera vez
git push -u origin nombre-de-la-rama

# Subidas siguientes
git push
```

#### 📋 Convención de Commits (Conventional Commits)

Seguimos el estándar [Conventional Commits](https://www.conventionalcommits.org/), que facilita la generación automática de changelogs y el versionado semántico del proyecto.

El formato es: `<tipo>: <descripción en imperativo y minúsculas>`

| Prefijo | Cuándo usarlo | Ejemplo |
| :--- | :--- | :--- |
| `feat:` | Nueva funcionalidad o lección | `feat: agregar módulo de pronunciación A1` |
| `fix:` | Corrección de un error | `fix: corregir ruta dinámica en Skill Lab` |
| `refactor:` | Cambio de código sin afectar funcionalidad | `refactor: simplificar lógica del reproductor de audio` |
| `docs:` | Cambios en documentación | `docs: actualizar sintaxis de lección A1` |
| `chore:` | Tareas de mantenimiento | `chore: actualizar dependencias de Next.js` |
| `style:` | Cambios de formato, espaciado, etc. | `style: aplicar linting en módulo de vocabulario` |

> 💡 **Regla de Oro:** El mensaje debe describir *por qué* se hizo el cambio, no solo *qué* cambió.

---

### 🔴 Fase 3 — Sincronización con `main` (Rebase)

**Escenario:** Llevas días trabajando en tu rama, pero mientras tanto alguien subió cambios importantes a `main`. Necesitas incorporarlos antes de continuar.

**¿Por qué `rebase` y no `merge`?** La diferencia está en el historial de commits que queda:

```
❌ Con merge (historial confuso):
A --- B --- C --- M  ← main
             \   /
              D-E    ← tu rama

✅ Con rebase (historial limpio y lineal):
A --- B --- C --- D' --- E'  ← tu rama sobre el main actualizado
```

El `rebase` "mueve" tus commits encima del `main` más reciente, como si hubieras empezado a trabajar hoy. Esto es lo que buscamos en SpeakUp.

```bash
# 1. Guardar trabajo en progreso
git stash

# 2. Actualizar main local
git checkout main
git pull origin main

# 3. Volver a tu rama
git checkout feature/nombre-de-la-tarea

# 4. Aplicar tus commits sobre el main actualizado
git rebase main
# Si hay conflictos: resuélvelos, luego ejecuta:
#   git add .
#   git rebase --continue
# Si quieres cancelar el proceso:
#   git rebase --abort

# 5. Recuperar tu trabajo y subir
git stash pop
git push --force-with-lease
```

> ⚠️ `--force-with-lease` es la versión segura del force push. Solo sobreescribe tu rama si nadie más la ha modificado desde tu última copia. **Nunca lo uses en una rama compartida sin coordinarte antes.**

---

### 👥 Fase 4 — Colaboración en Rama Compartida

**Escenario:** Trabajas en `feature/login` con un compañero que subió cambios hace 10 minutos. Necesitas esos cambios antes de continuar.

```bash
# 1. Guardar trabajo pendiente
git stash

# 2. Traer los cambios del compañero y apilar tus commits encima
git pull --rebase origin nombre-de-la-rama-compartida

# 3. Recuperar tu trabajo
git stash pop

# 4. Continuar y subir
git push
```

---

### 📚 Referencia Rápida de Comandos

| Comando | Cuándo usarlo | Nivel de riesgo |
| :--- | :--- | :--- |
| `git fetch -p` | Al inicio de jornada, para limpiar ramas eliminadas. | ✅ Muy seguro |
| `git stash` | Antes de cualquier `pull`, `rebase` o cambio de rama. | ✅ Seguro |
| `git pull --rebase` | Cuando un compañero subió cambios a la rama compartida. | ✅ Seguro |
| `git rebase main` | Para integrar cambios de `main` en tu rama de tarea. | ⚠️ Puede generar conflictos |
| `git rebase --abort` | Si los conflictos son muy complejos y prefieres empezar de cero. | ✅ Revierte todo |
| `git push --force-with-lease` | Solo después de un rebase, para actualizar el remoto. | 🔴 Peligroso en ramas compartidas |
| `git reset --hard origin/main` | Al inicio de jornada para borrar cambios locales sin subir. | 🔴 Destructivo e irreversible |

---

## 📐 Protocolo de Entrega (Pull Requests)

### Paso 1 — Abre el Pull Request

Una vez que hayas subido tu rama con `git push`, ve a GitHub y abre un PR.

- **Si tu trabajo aún está en progreso**, ábrelo como **Draft PR**. Esto da visibilidad al equipo sin señalarlo como listo para revisión.
- **Cuando esté listo**, cámbialo a "Ready for Review".

**Título** — Descriptivo y directo, siguiendo la misma convención de commits:
```
feat: implementación de mapa de carga lógica en módulo 2
fix: corrección de ruta dinámica en Skill Lab
docs: actualización de sintaxis de lección A1
```

### Paso 2 — Descripción del PR

Responde estas tres preguntas en la descripción:

- **¿Qué cimiento estamos reforzando?** *(Contexto del cambio)*
- **¿Qué piezas se agregaron o eliminaron?** *(Cambios técnicos)*
- **Evidencia de ejecución:** capturas de pantalla o logs que validen que la estructura es sólida.

### Paso 3 — Revisión

- **No se permite el auto-merge.** Se requiere al menos una aprobación de un par antes de fusionar.
- Si recibes comentarios, aplica los cambios en tu misma rama y sube de nuevo con `git push`.

### Paso 4 — Merge

Usamos **Squash and Merge** en GitHub. Esto comprime todos los commits de tu PR en uno solo antes de integrarlo a `main`, manteniendo el historial de `main` perfectamente limpio.

```
Tu rama:  feat: A → fix: typo → fix: another typo → refactor: cleanup
               ↓  Squash and Merge
main:     feat: implementación de mapa de carga lógica en módulo 2
```

---

## 📢 Nota de Mentoría

> "Aprender bien toma tiempo, y construir un sistema robusto también."

No buscamos velocidad, buscamos solidez. Si tu propuesta es rechazada o requiere ajustes, no lo tomes como algo personal; es simplemente un esfuerzo de diseño para asegurar que la base de SpeakUp no ceda bajo presión.

¡Manos a la obra!

---

<p align="center">
  <code>#SpeakUp</code> &nbsp; <code>#BuildInPublic</code> &nbsp; <code>#LogicFirst</code> &nbsp; <code>#SkillLab</code>
</p>