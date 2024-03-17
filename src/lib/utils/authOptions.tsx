import FusionAuthProvider from 'next-auth/providers/fusionauth';

export const authOptions = {
  providers: [
    FusionAuthProvider({
      clientId: process.env.FUSIONAUTH_CLIENT_ID ?? '',
      clientSecret: process.env.FUSIONAUTH_CLIENT_SECRET ?? '',
      issuer: process.env.FUSIONAUTH_ISSUER,
      accessTokenUrl: `${process.env.FUSIONAUTH_ISSUER}/oauth2/token`,
      profileUrl: `${process.env.FUSIONAUTH_ISSUER}/oauth2/userinfo`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? '',
};
