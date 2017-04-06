git push
git checkout master
git merge development
git push
git checkout development
bash -c "ssh -t dh_chavarim@ps565483.dreamhost.com -pw iWTinAk9 './deploy.sh'"