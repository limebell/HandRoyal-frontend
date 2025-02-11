import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RawPrivateKey } from '@planetarium/account';
import { useAccount } from '../context/AccountContext';

const TEST_ACCOUNTS = [
  {
    privateKey: '27950e31daa29df8cb3639377a056a03836f79867ce65d1a715f52278b46a479',
    address: '0x3df656F6E8Ed3C9ba5fE5596FC69eDbe8614EB2C'
  },
  {
    privateKey: '92a0a4fac1a19af90eeded2bdd422d65a56612ad8fba9b3f96052e3c309be23d',
    address: '0x798f0D17a47b120069329313BaDdAd1eC97b5a83'
  },
  {
    privateKey: 'a487c5a2cf88e00a4dd57f60baadb0ba4ec24caa52d01ae21dd2f79bef52795c',
    address: '0xF17D2337858EcD8e4e9DFEa8953f7a38109799fe'
  }
];

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { setPrivateKey } = useAccount();
  const [privateKeyInput, setPrivateKeyInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const privateKey = RawPrivateKey.fromHex(privateKeyInput);
      setPrivateKey(privateKey);
      setErrorMessage(null);
      navigate('/');
    } catch (error) {
      console.error('Invalid private key format:', error);
      setErrorMessage('' + error);
    }
  };

  return (
    <div className="login-page p-4 max-w-4xl mx-auto">
      <div className="login-form max-w-md mx-auto mb-12">
        <h1 className="text-2xl font-bold mb-4">{t('login')}</h1>
        <input
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder={t('enterPrivateKey')}
          type="password"
          value={privateKeyInput}
          onChange={(e) => setPrivateKeyInput(e.target.value)}
        />
        {errorMessage && (
          <div className="text-red-500 italic mb-4">
            {errorMessage}
          </div>
        )}
        <button
          className="bg-blue-500 text-white p-2 rounded w-full"
          onClick={handleLogin}
        >
          {t('loginButton')}
        </button>
      </div>

      <div className="test-accounts">
        <h2 className="text-xl font-semibold mb-4">{t('testAccounts')}</h2>
        <div className="md:overflow-visible overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b text-left">{t('privateKey')}</th>
                <th className="px-6 py-3 border-b text-left">{t('address')}</th>
              </tr>
            </thead>
            <tbody>
              {TEST_ACCOUNTS.map((account) => (
                <tr key={account.privateKey} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b font-mono text-sm break-all">
                    {account.privateKey}
                  </td>
                  <td className="px-6 py-4 border-b font-mono text-sm break-all">
                    {account.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 