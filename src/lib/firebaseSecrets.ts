const secrets = {
  type: process.env.FIREBASE_ADMIN_SECRET_TYPE!,
  project_id: process.env.FIREBASE_ADMIN_SECRET_PROJECT_ID!,
  private_key_id: process.env.FIREBASE_ADMIN_SECRET_PRIVATE_KEY_ID!,
  private_key: `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC2+V3mxOu/ikQk
KeovOQBxpKfJqfbUnngTLDLZY4fycS7fCInBOaxppwQxCc/NvELVE6AbXzufzjZ9
L1uxuy8qbQNgjbCSgnvj0wNH4nobkt9rRD1BJgFQJe5vnsteeohOE5q5yeTxd5Ud
VAl7U2Qtv/VkZoQlo6bMZsfMKNBdfaYLEoT0pcCSK3+0LHiADZvIv/r2EpZWBaH1
v69/EA6C+TwshrZ/zKXOXA3RgGDg+HxraH1rGqMb/sc1PSlxDXTP8idP5gOUbrlb
kF+r+dndkakw3gJtHXY8EzN6bfLlXAg5Ej603w1WtoYdDkXJdw4ptYSr0lLnyAvY
rfmss/k3AgMBAAECggEAU0XxZP35Nv6T3YuP77b3C0F/NWobko+eoUcry0EflYjK
Zqopm52GaL0gzLqk7wK/vd7FLr/sUGIW7WlYx24j3KCpeU9y7XLiNIEMDLK3lQYG
lXiEkjpcPaBNwFIaR2Dn2PTWJbkLb5PXcvYUrKJ6xNGIuo1nlgPBfWRHiRSIJAuu
cOTPDgSeE0oZpfO6Z3ZWRTNngmrMpycCmCWf8hZBUMLBiCUqHGKaIgMru09Nr5fG
VX8KkSQrzBmutYBirltOoYKQT/tIpzbNwjPWH8mTmGzVw8POKQo9EnxNzmcr/k79
ATB/Ffi2Zw8v+jSPkyAydGC7m2uftdJ8xtb2dmpy0QKBgQDkwz3QNE1JkS1zRYzM
q6kOKGhgDdF1kUu2yHVPmG71cyh3tb+j71oVayivIpGhbbghY9ET5Evn5EcnOwcD
0FcOFOzaejJCB+vW4Vzx0Z9udkqXW9xTN1GEXaYipsKSaua3Q5CxgsWMCgWBpHbK
CMxyveYVk4TFLpekwu5gvJtZMQKBgQDMwnmg2Dnonyu147sYVGSSm8HlEwDnwsJk
aPhoDHGzA6/oyJ5uER8g+JFIWtqAKzkysRA0QTtgBol67oQy7wCO6udHRuOoDZzG
g5O0rs9gXIYUdSSMkPl0fb1r2g0SzF/SYU7keekpni6Fiu7nIe9Wv4XPMnhu2dUs
ZWV3DI7e5wKBgEfw5oWNjSivkT2JB8hty5J6PqjGb7KraMYosEvBwlNKTdWnwIbL
hObrdjXthyLfIGLPwzagOwbIEWBS/dfDMz1oczwZ5ahCWXaQFOyvYZYZeUe0ScuZ
v/cChHatPs9Q8xF7HAvW9k0d8bFdiUXsEm+bLLpoU/62slXMP68IYUphAoGAEzb0
vvlLhd7Z9TmnpwLUZUWkjmCYJyeJom6PUQRJ7yiba1bYNy/4IdnxmD6eXoSv22fu
Q1kTv1EduaGEWls/TCoTBgdK+cw9OAvE4qG86CgGlQjhIye/oQTjr6lIrMjs/QsQ
ojQmgzdK2lFNVfdDRHq4jdcIoi5i6MWjHebZyWUCgYBxKl/TBBE4DIGuzgYI1gSf
4jPU7yeDEIr3to4cAgzZ9zFBD2EzAA3Qc2vHXet73Bm34IbIgRO4IBOgJPFul3eA
wBke2ITcH0MNO4SVjs38zdjbPqKVywb5WxlQHkY8FbpuL1BfHR1cCaPczqDvYYVo
PUuJKzNJXPT2bw1x1a2jig==
-----END PRIVATE KEY-----
`,
  client_email: process.env.FIREBASE_ADMIN_SECRET_CLIENT_EMAIL!,
  client_id: process.env.FIREBASE_ADMIN_SECRET_CLIENT_ID!,
  auth_uri: process.env.FIREBASE_ADMIN_SECRET_AUTH_URI!,
  token_uri: process.env.FIREBASE_ADMIN_SECRET_TOKEN_URI!,
  auth_provider_x509_cert_url:
    process.env.FIREBASE_ADMIN_SECRET_AUTH_PROVIDER_X509_CERT_URL!,
  client_x509_cert_url: process.env.FIREBASE_ADMIN_SECRET_CLIENT_X509_CERT_URL!,
};

export default secrets;
