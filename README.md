# 🚀 Transactions with QueryRunner in NestJS - DRY Implementation

Este proyecto demuestra cómo implementar **transacciones de base de datos** en NestJS usando el **QueryRunner de TypeORM** siguiendo el estilo de arquitectura modular sugerido por Nest y  aplicando el principio **DRY (Don't Repeat Yourself)** para evitar código duplicado en operaciones transaccionales.

---

## 🚀 Tecnologías utilizadas

- [NestJS](https://nestjs.com/) (v11)
- [TypeORM](https://typeorm.io/)
- PostgreSQL/MySQL/SQLite (configurable)
- Node.js & TypeScript
- pnpm (opcional)

---

## 📦 Estructura del proyecto

```
src/
├── employees/
│   ├── employees.controller.ts
│   ├── employees.module.ts
│   ├── employees.service.ts
│   └── entities/
│       └── employee.entity.ts
├── users/
│   ├── users.service.ts
│   └── entities/
│       └── user.entity.ts
├── common/
│   └── services/
│       └── transaction.service.ts  # Contiene la lógica transaccional reutilizable
├── app.module.ts
└── main.ts
```

---

## 📚 ¿Por qué usar QueryRunner?

El **QueryRunner de TypeORM** permite:
- Control manual de transacciones
- Operaciones atómicas (todo o nada)
- Reutilización de lógica transaccional (DRY)
- Mayor flexibilidad que decoradores `@Transaction`

---

## 🔄 Flujo transaccional implementado

1. **Inicio de transacción**: Se crea un `QueryRunner` y se inicia la transacción
2. **Ejecución**: Todas las operaciones de DB usan el mismo `QueryRunner`
3. **Confirmación/Rollback**:
    - Si todo sale bien → `commitTransaction()`
    - Si hay errores → `rollbackTransaction()`
6. **Liberación**: El QueryRunner se libera siempre en el finally

---

## 🧩 Cómo funciona el servicio transaccional

El `TransactionService` centraliza la lógica para:

```typescript
async runInTransaction<T>(
  callback: (qr: QueryRunner) => Promise<T>
): Promise<T> {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const result = await callback(queryRunner);
    await queryRunner.commitTransaction();
    return result;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}
```

---

## 🛠️ Instalación y uso

```bash
# Clona el repositorio
git clone https://github.com/Josmendev/query-runner-dry.git

# Entra al proyecto
cd tuto-query-runner

# Instala dependencias
pnpm install

# Levanta la base de datos
docker compose up -d

# Ejecuta en modo desarrollo
pnpm start:dev
```

---

## 📬 Prueba el endpoint

Puedes usar herramientas como Insomnia o Postman para probar el endpoint.

```json
POST /employees
Content-Type: application/json

{
  "firstName": "Jose",
  "lastName": "Menacho",
  "identityNumberDocument": "12345678"
}
```

---

## 🎯 Beneficios clave

- ✅ **Código más limpio:** Elimina duplicación de lógica transaccional
- ✅ **Consistencia garantizada:** Operaciones atómicas (todo o nada)
- ✅ **Mantenibilidad:** Cambios en un solo lugar afectan a toda la app
- ✅ **Flexibilidad:** Fácil de extender para casos complejos

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Siéntete libre de usarlo como referencia o para aprender.

---

## ✨ Autor

JosmenDev - [@josmendev](https://github.com/josmendev)