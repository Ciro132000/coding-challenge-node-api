import { JwtAdapter } from "./jwt.js";

describe("JwtAdapter", () => {
  it("Debería generar un token correctamente", async () => {
    const payload = { id: "123", role: "admin" };
    
    const token = await JwtAdapter.generateToken(payload);
    
    expect(typeof token).toBe("string");
    expect(token?.length).toBeGreaterThan(10);
  });

  it("Debería validar un token válido", async () => {
    const payload = { id: "123" };
    
    const token = await JwtAdapter.generateToken(payload);
    
    expect(token).not.toBeNull();
    
    const decoded = await JwtAdapter.validateToken(token as string);
    
    expect(decoded).toBeDefined();
    expect(decoded).toMatchObject(payload);
  });

  it("Debería devolver null para un token no válido", async () => {
    const invalidToken = "this.is.not.valid";
    
    const decoded = await JwtAdapter.validateToken(invalidToken);
    
    expect(decoded).toBeNull();
  });
});
