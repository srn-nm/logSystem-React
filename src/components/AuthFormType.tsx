export interface AuthForm {
  username: string;
  password: string;
  authType: "USERPASS" | "LDAP";
  type: "MOBILE" | "QR";
}