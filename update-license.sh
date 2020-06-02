#!/bin/bash
# Set edition type for activation as host / pro / admin
edition=host
gist_username=adryanev
gist_id=c25f1a42946c9e85765d0861bf38c866
# Only Plesk Web Host Edition Trial key are availavle from: https://trialplesk.domainhizmetleri.com (Every Month)
#
# *************** do not change below this line ***************
#
key=$(/usr/bin/wget https://gist.githubusercontent.com/${gist_username}/${gist_id}/raw/${edition} -q -O -)
key_id=$(/usr/sbin/plesk bin keyinfo --list | grep plesk_key_id | grep -Eo '[[:alpha:]]{4}[[:digit:]]{12}')
lim_date=$(/usr/sbin/plesk bin keyinfo --list | grep lim_date | grep -Eo '[[:digit:]]{8}')
# plesk_key_id: plsk000000000000 | lim_date: -1
#if [ "${key_id}" = "plsk000000000000" ] || [ $lim_date -eq -1 ]
#then
/bin/rm -rf /etc/sw/keys/keys/key*
/usr/sbin/plesk bin license -i ${key}
#exit 0
#else
#echo "Error Key Id: ${key_id} OR  Key Date: ${lim_date} exists!";
#exit 113
#fi