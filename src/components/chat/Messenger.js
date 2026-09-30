import MessengerCustomerChat from 'react-messenger-customer-chat';
import useTranslation from 'next-translate/useTranslation';

function MessengerComponent({ lang }) {
    const { t } = useTranslation('messenger');

    return (
        <div>
            <MessengerCustomerChat
                pageId={lang == 'si-LK' ? t('page_id_si_lk') : t('page_id_default')}
                appId="517179266738027"
            />
        </div>
    );
}

export default MessengerComponent;