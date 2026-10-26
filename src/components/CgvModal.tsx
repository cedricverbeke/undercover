import { X } from 'lucide-react';

interface CgvModalProps {
  onClose: () => void;
}

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: '1. Éditeur du service',
    body: [
      'Le site internet madijeux.fr est édité par :',
      'Contact : support@madijeux.fr',
    ],
  },
  {
    title: '2. Objet et Champ d\'application',
    body: [
      'Les présentes Conditions Générales de Vente (CGV) régissent l\'accès payant aux fonctionnalités premium du jeu d\'ambiance en ligne proposé sur le site madijeux.fr (ci-après « le Service ») entre l\'Éditeur et toute personne physique ou morale (ci-après « l\'Utilisateur »).',
      'Toute commande effectuée sur le site implique l\'acceptation sans réserve des présentes CGV.',
    ],
  },
  {
    title: '3. Offres et Description des Formules',
    body: [
      'Le Service propose deux formules d\'accès payant débloquant l\'intégralité du dictionnaire de mots du jeu :',
      'Pass Soirée (24 heures) : Débloque l\'accès à l\'ensemble des mots pour une durée continue de 24 heures à compter de la confirmation du paiement.',
      'Pass à Vie : Débloque l\'accès à l\'ensemble des mots de manière illimitée dans le temps, sous réserve des conditions techniques décrites à l\'Article 4.',
    ],
  },
  {
    title: '4. Modalités Techniques d\'Accès et Conservation des Pass (Important)',
    body: [
      'L\'accès aux offres payantes fonctionne selon un système d\'identification d\'appareil sans création obligatoire de compte client :',
      'Fonctionnement : La validation de l\'achat associe le Pass à l\'identifiant technique (navigateur/appareil) utilisé lors du paiement via le stockage local (Local Storage / Cookies).',
      'Perte d\'accès liée au vider de cache / données : Le Pass est directement lié aux données de navigation stockées sur l\'appareil. Si l\'Utilisateur vide le cache de son navigateur, efface ses données de navigation, réinitialise son appareil ou change d\'appareil/navigateur, les données relatives au Pass seront définitivement supprimées.',
      'Absence de restauration automatique : L\'Éditeur ne garantit pas la possibilité de restaurer automatiquement un Pass en cas de suppression des données locales par l\'Utilisateur. Il appartient à l\'Utilisateur de conserver son reçu de paiement Stripe afin de pouvoir contacter le support client si besoin.',
    ],
  },
  {
    title: '5. Tarifs et Paiement',
    body: [
      'Prix : Les tarifs des formules (Pass Soirée et Pass à Vie) sont indiqués en Euros (€) Toutes Taxes Comprises (TTC) sur la page de paiement.',
      'Modalités de paiement : Le règlement s\'effectue intégralement en ligne par carte bancaire via la plateforme sécurisée Stripe.',
    ],
  },
  {
    title: '6. Exécution Immédiate et Renonciation au Droit de Rétractation',
    body: [
      'Conformément à l\'article L.221-28 13° du Code de la consommation, le droit de rétractation de 14 jours ne s\'applique pas aux contrats de fourniture de contenu numérique non fourni sur un support matériel dont l\'exécution a commencé après accord préalable express du consommateur.',
      'En validant la commande et en cochant la case dédiée lors du paiement, l\'Utilisateur :',
      'Demande l\'exécution et l\'accès immédiat au Service dès la validation du paiement.',
      'Renonce expressément à son droit de rétractation de 14 jours.',
    ],
  },
  {
    title: '7. Propriété Intellectuelle',
    body: [
      'L\'ensemble du code source, des graphismes, des textes, des listes de mots et du concept du jeu présent sur madijeux.fr demeure la propriété exclusive de l\'Éditeur. L\'achat d\'un Pass confère uniquement un droit d\'usage personnel, privé et non exclusif.',
    ],
  },
  {
    title: '8. Responsabilité et Disponibilité',
    body: [
      'L\'Éditeur s\'efforce de garantir un accès au jeu 24h/24 et 7j/7. Toutefois, l\'Éditeur ne saurait être tenu responsable des pannes de serveurs, des coupures de réseau internet ou d\'éventuelles incompatibilités avec certains navigateurs ou appareils.',
    ],
  },
  {
    title: '9. Droit Applicable et Médiation',
    body: [
      'Les présentes CGV sont soumises au droit français. En cas de litige, l\'Utilisateur peut contacter le support à support@madijeux.fr. À défaut de résolution amiable, le consommateur peut recourir gratuitement à un médiateur de la consommation.',
    ],
  },
];

export function CgvModal({ onClose }: CgvModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-5 flex items-center justify-between z-10">
          <h2 className="text-lg font-black text-white">Conditions Générales de Vente (CGV)</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-slate-200 text-sm mb-1.5">{section.title}</h3>
              <div className="space-y-1.5">
                {section.body.map((line, i) => (
                  <p key={i} className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
